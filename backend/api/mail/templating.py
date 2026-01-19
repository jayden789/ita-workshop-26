"""
Provides rendering and checking for mail templates.
"""

import itertools
import logging
import re

from django.conf import settings as django_settings
from django.core import mail
from django.utils import html as utils_html

logger = logging.getLogger(__name__)  # pylint: disable=invalid-name


class UnsupportedTagsError(ValueError):
    """
    Indicates that a template includes tags which are not supported.
    """

    def __init__(self, tags, *args, **kwargs):
        self.tags = tags
        super().__init__(*args, **kwargs)


class InvalidVarContextError(ValueError):
    """
    Indicates that a variable could not be rendered due to invalid context.
    """


class InvalidTemplateContextError(ValueError):
    """
    Indicates that a template could not be rendered due to invalid context.

    Attributes:
        error_messages: dict from TemplateVar tag to error message
    """

    def __init__(self, error_messages, *args, **kwargs):
        self.error_messages = error_messages
        super().__init__(*args, **kwargs)


class TemplateVar:
    """
    A variable which can be rendered in a template.

    Class attributes:
        tag: a string which identifies the variable in a template
    """

    tag = None

    @classmethod
    def render_plaintext(cls, context):
        """
        Returns the variable rendered as a plaintext string.

        Raises:
            InvalidContextError if the given context is not valid.
        """
        raise NotImplementedError()

    @classmethod
    def render_html(cls, context):
        """
        Returns the variable rendered as an HTML string.

        Raises:
            InvalidContextError if the given context is not valid.
        """
        return utils_html.escape(cls.render_plaintext(context))

    @classmethod
    def render(cls, context, html=False):
        """
        Delegates to one of the other `render_*` methods, based on the
        specified `html` argument.
        """
        if html:
            return cls.render_html(context)
        return cls.render_plaintext(context)


class FirstNameVar(TemplateVar):
    """Renders the user's first name."""

    tag = "first_name"

    @classmethod
    def render_plaintext(cls, context):
        user_profile = context.get("user_profile", None)
        if user_profile is None:
            raise InvalidVarContextError(
                "Context must contain user_profile to render first name"
            )
        return user_profile.first_name


class LastNameVar(TemplateVar):
    """Renders the user's last name."""

    tag = "last_name"

    @classmethod
    def render_plaintext(cls, context):
        user_profile = context.get("user_profile", None)
        if user_profile is None:
            raise InvalidVarContextError(
                "Context must contain user_profile to render last name"
            )
        return user_profile.last_name


class FullNameVar(TemplateVar):
    """Renders the user's full name."""

    tag = "full_name"

    @classmethod
    def render_plaintext(cls, context):
        user_profile = context.get("user_profile", None)
        if user_profile is None:
            raise InvalidVarContextError(
                "Context must contain user_profile to render full name"
            )
        return user_profile.full_name


class FormalNameVar(TemplateVar):
    """Renders the user's formal name, i.e. honorific and full name."""

    tag = "formal_name"

    @classmethod
    def render_plaintext(cls, context):
        user_profile = context.get("user_profile", None)
        if user_profile is None:
            raise InvalidVarContextError(
                "Context must contain user_profile to render formal name"
            )
        return user_profile.formal_name


class FormalLastNameVar(TemplateVar):
    """Renders the user's formal last name, i.e. honorific and last name."""

    tag = "formal_last_name"

    @classmethod
    def render_plaintext(cls, context):
        user_profile = context.get("user_profile", None)
        if user_profile is None:
            raise InvalidVarContextError(
                "Context must contain user_profile to render formal name"
            )
        return user_profile.formal_last_name


class AffiliationTitleVar(TemplateVar):
    """Renders the user's affiliation title."""

    tag = "affiliation_title"

    @classmethod
    def render_plaintext(cls, context):
        user_profile = context.get("user_profile", None)
        if user_profile is None:
            raise InvalidVarContextError(
                "Context must contain user_profile to render affiliation title"
            )
        return user_profile.affiliation_title


class WorkshopTitleVar(TemplateVar):
    """Renders the workshop's title."""

    tag = "workshop_title"

    @classmethod
    def render_plaintext(cls, context):
        workshop = context.get("workshop", None)
        if workshop is None:
            raise InvalidVarContextError(
                "Context must contain workshop to render workshop title"
            )
        return workshop.title


SUPPORTED_VARS = {
    var.tag: var
    for var in [
        FirstNameVar,
        LastNameVar,
        FullNameVar,
        FormalNameVar,
        FormalLastNameVar,
        AffiliationTitleVar,
        WorkshopTitleVar,
    ]
}


# A tag consists of one or more alphanumeric/underscore chars, and is marked
# by a dollar sign $, unless the dollar sign is duplicated. For example,
# "hello_1" is a tag in the string "$hello_1", but there are no tags in the
# strings "$$" and "$$hello_1".
TAG_REGEX = re.compile(r"(?<!\$)(?P<doubles>(\$\$)*)\$(?P<tag>[A-Za-z1-9_]+)")


def find_tags(text):
    """Returns the set of tags found in the given text."""
    tags = set()
    for match in TAG_REGEX.finditer(text):
        tags.add(match.groups()[-1])
    return tags


def render_vars(template_vars, context, html=False):
    """
    Render each of the given TemplateVars in the given context.

    Arguments:
        template_vars: an iterable of TemplateVar classes
        context: same as in `TemplateVar.render`
        html: same as in `TemplateVar.render`

    Raises:
        InvalidTemplateContextError:
            if any TemplateVar raised an InvalidVarContextError
    """
    rendered_vars = {}
    render_error_messages = {}
    for var in template_vars:
        try:
            rendered_vars[var.tag] = var.render(context, html)
        except InvalidVarContextError as e:  # pylint: disable=invalid-name
            render_error_messages[var.tag] = str(e)
    if bool(render_error_messages):
        raise InvalidTemplateContextError(render_error_messages)
    return rendered_vars


def substitute_vars(text, rendered_vars):
    """
    Returns the given text, substituting rendered variables in place of their
    delimited tags, and substituting single "<" characters in place of "<<".
    """

    double_brackets_pattern = r"(?P<doubles>(\$\$)*)"
    any_tag_pattern = r"(?P<tag>{})".format("|".join(rendered_vars.keys()))
    sub_pattern = r"{double}(\${any_tag})?".format(
        double=double_brackets_pattern, any_tag=any_tag_pattern
    )
    sub_regex = re.compile(sub_pattern)

    def substitute(match):
        doubles = match.groupdict().get("doubles", "")
        singles = "$" * (len(doubles) // 2)

        tag = match.groupdict().get("tag", None)
        tag_substitute = "" if (tag is None) else rendered_vars[tag]

        return "{}{}".format(singles, tag_substitute)

    return sub_regex.sub(substitute, text)


def render_text(text, context, html=False):
    """
    Like render_text_multiple, but for just one context.
    """
    return list(render_text_multiple(text, [context], html=html))[0]


def render_text_multiple(text, contexts, html=False):
    """
    Renders the given text, replacing variable tags by rendering them in the
    given contexts.

    Arguments:
        text: a string to render
        contexts: iterable of contexts, as in `TemplateVar.render`
        html: same as in `TemplateVar.render`

    Raises:
        UnsupportedTagsError:
            if the given text contains tags that we don't have
            support for rendering
    """
    text = text.replace("\n", "<br/>")

    tags_present = find_tags(text)
    if not bool(tags_present):
        return (text for _ in contexts)

    unsupported_tags = tags_present - SUPPORTED_VARS.keys()
    if bool(unsupported_tags):
        raise UnsupportedTagsError(unsupported_tags)

    vars_present = [SUPPORTED_VARS[tag] for tag in tags_present]
    return (
        substitute_vars(text, render_vars(vars_present, context, html))
        for context in contexts
    )


def generate_messages(
    subject, body_template, contexts, *, render_kwargs=None, max_messages=None
):
    """Generate a tuple of ``(User, EmailMessage)`` for each context."""
    contexts = list(itertools.islice(contexts, max_messages))
    assert all("user" in context for context in contexts)

    if render_kwargs is None:
        render_kwargs = {}
    render_kwargs.setdefault("html", True)
    bodies = render_text_multiple(body_template, contexts, **render_kwargs)

    for context, body in zip(contexts, bodies):
        user = context["user"]
        message = mail.EmailMessage(
            subject=subject,
            body=body,
            from_email=django_settings.DEFAULT_FROM_EMAIL,
            to=[user.email],
            bcc=[django_settings.DEFAULT_BCC_EMAIL],
        )
        message.content_subtype = "html"
        yield (user, message)
