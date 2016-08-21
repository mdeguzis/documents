# Tweaks

## Choppy Image / Text Scrolling

Type "about::config" into the URL bar.

Scrolling in Firefox can feel "jerky" or "choppy". A post on MozillaZine gives settings that work on Gentoo, but reportedly work on Arch Linux as well:

* Set mousewheel.min_line_scroll_amount to 40
* Set general.smoothScroll and general.smoothScroll.pages to false
* Set image.mem.min_discard_timeout_ms to something really large such as 2100000000 but no more than 2140000000. Above that number Firefox will not accept your entry and complain with the error code: "The text you entered is not a number."
* Set image.mem.max_decoded_image_kb to at least 512K
