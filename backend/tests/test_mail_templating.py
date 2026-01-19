"""
Tests for the `api.mail.templating` module.
"""


from api.mail import templating
from api import models


class TestFindTags:
    """Tests for `templating.find_tags`."""

    def test_no_dollars(self):
        text = "There are no tags in this text because there are no dollars"
        tags = templating.find_tags(text)
        assert tags == set()

    def test_double_dollars(self):
        text = "Double dollars $$don't start $$tags"
        tags = templating.find_tags(text)
        assert tags == set()

    def test_valid_tags(self):
        text = "Here $are some $valid_tags, even with a $number_like_2"
        tags = templating.find_tags(text)
        assert tags == {"are", "valid_tags", "number_like_2"}

    def test_empty_text(self):
        assert templating.find_tags("") == set()

    def test_double_before_tag(self):
        text = "$$$tag1$tag2 $tag3"
        tags = templating.find_tags(text)
        assert tags == {"tag1", "tag2", "tag3"}

    def test_two_doubles_prevent_tag(self):
        text = "$$$$tag1$tag2"
        tags = templating.find_tags(text)
        assert tags == {"tag2"}

    def test_two_doubles_before_tag(self):
        text = "$$$$$tag1$tag2"
        tags = templating.find_tags(text)
        assert tags == {"tag1", "tag2"}

    def test_space_after_open_dollar_prevents_tag(self):
        text = "the space after this open bracket $ prevents a tag"
        tags = templating.find_tags(text)
        assert tags == set()


class TestRenderText:
    """Tests for `templating.render_text`."""

    user_profile = models.UserProfile(
        first_name="Terrence",
        last_name="Tao",
        affiliation=models.Affiliation(title="UCLA"),
        honorific=models.Honorific.PROFESSOR.name,
    )
    workshop = models.Workshop(title="2100 ITA Workshop")

    def test_render_empty_text(self):
        assert templating.render_text("", {}) == ""

    def test_render_text_without_tags(self):
        text = "This text has no tags, so it should be the same when rendered"
        assert templating.render_text(text, {}) == text

    def test_render_formal_name(self):
        text = "Hello $formal_name"
        context = {"user_profile": self.user_profile}
        expected = "Hello Prof. Terrence Tao"
        assert templating.render_text(text, context) == expected

    def test_render_full_name(self):
        text = "Hello $full_name"
        context = {"user_profile": self.user_profile}
        expected = "Hello Terrence Tao"
        assert templating.render_text(text, context) == expected

    def test_render_affiliation_title(self):
        text = "Hope all is well at $affiliation_title"
        context = {"user_profile": self.user_profile}
        expected = "Hope all is well at UCLA"
        assert templating.render_text(text, context) == expected

    def test_render_workshop_title(self):
        text = "We write to invite you to the $workshop_title"
        context = {"workshop": self.workshop}
        expected = "We write to invite you to the 2100 ITA Workshop"
        assert templating.render_text(text, context) == expected

    def test_replace_doubles_among_vars(self):
        text = """
        Thanks for registering for the $workshop_title.
        We have received your registration payment of $$314.
        Furthermore, here are$ $$some $$ symbols $ for $$good$$ measure$$.
        Thanks for visiting from $affiliation_title!
        """
        context = {
            "workshop": self.workshop,
            "user_profile": self.user_profile,
        }
        expected = """
        Thanks for registering for the 2100 ITA Workshop.
        We have received your registration payment of $314.
        Furthermore, here are$ $some $ symbols $ for $good$ measure$.
        Thanks for visiting from UCLA!
        """
        assert templating.render_text(text, context) == expected


class TestRenderTextMultiple:
    """Tests for `templating.render_text_multiple`."""

    user_profiles = [
        models.UserProfile(
            first_name="Terrence",
            last_name="Tao",
            affiliation=models.Affiliation(title="UCLA"),
            honorific=models.Honorific.PROFESSOR.name,
        ),
        models.UserProfile(
            first_name="Albert",
            last_name="Einstein",
            affiliation=models.Affiliation(title="IAS"),
            honorific=models.Honorific.PROFESSOR.name,
        ),
        models.UserProfile(
            first_name="Richard",
            last_name="Feynman",
            affiliation=models.Affiliation(title="Caltech"),
            honorific=models.Honorific.DOCTOR.name,
        ),
    ]

    def test_render_multiple_without_vars(self):
        text = "This text has no vars"
        contexts = [{}, {}, {}]
        expected = [
            "This text has no vars",
            "This text has no vars",
            "This text has no vars",
        ]
        assert (
            list(templating.render_text_multiple(text, contexts)) == expected
        )

    def test_render_full_name(self):
        text = "Hello $full_name from $affiliation_title"
        contexts = [
            {"user_profile": user_profile}
            for user_profile in self.user_profiles
        ]
        expected = [
            "Hello Terrence Tao from UCLA",
            "Hello Albert Einstein from IAS",
            "Hello Richard Feynman from Caltech",
        ]
        actual = list(templating.render_text_multiple(text, contexts))
        assert actual == expected
