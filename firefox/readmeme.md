<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Tweaks](#tweaks)
  - [Choppy Image / Text Scrolling](#choppy-image--text-scrolling)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Tweaks

## Choppy Image / Text Scrolling

Type "about::config" into the URL bar.

Scrolling in Firefox can feel "jerky" or "choppy". A post on MozillaZine gives settings that work on Gentoo, but reportedly work on Arch Linux as well:

* Set mousewheel.min_line_scroll_amount to 40
* Set general.smoothScroll and general.smoothScroll.pages to false
* Set image.mem.min_discard_timeout_ms to something really large such as 2100000000 but no more than 2140000000. Above that number Firefox will not accept your entry and complain with the error code: "The text you entered is not a number."
* Set image.mem.max_decoded_image_kb to at least 512K
