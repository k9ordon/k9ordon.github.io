---
title: Mobile Safari - Clicking fixed bottom elements
updated: 2016-04-07 10:50
category: Mobile Safari
---

Floating Action Button. OOOH AHHH OOOOH. Much material design. FAB FAB. A disruptive conversion element floating above the UI. Hard to ignore.


Lets say we are in [perfect conditions](http://www.zeldman.com/2015/06/03/material-design-why-the-floating-action-button-is-bad-ux-design/) and not [only "consume content"](consume content). The best way to convert a user to an action is by disrupting from content and offer a primary action. Google introduced [Floating Action Buttons](https://www.google.com/design/spec/components/buttons-floating-action-button.html#buttons-floating-action-button-floating-action-button) with Material Design in Summer 2014.

![a fab](/assets/build/mobile-safari-floating-action-buttons/fab.png)

Soon this concept moved to the web. As I recently revisited this implementation of a Conversion button. When I place the button at the bottom, I ran into some old but serious Mobile Safari UX issues (known from bottom toolbars and similar UI stuff fixed on bottom).

## The problem is simple

Assuming you are on an iOS Device

- An element is styled with ```position: fixed; bottom: 0;```
- Scroll page down
- Mobile Safari's bottom toolbars slide out
- Click the fixed bottom element
- Element receives no click event **instead** the browser toolbars slide back in
- [W](http://apple.stackexchange.com/questions/130822/safari-ios-menu-bar-conflicts-with-buttons-in-lower-10-of-the-screen)
- [T](http://stackoverflow.com/questions/21715917/prevent-mobile-safari-from-presenting-toolbar-when-bottom-of-viewport-is-tapped)
- [F](http://stackoverflow.com/questions/23657943/buttons-aligned-to-bottom-of-page-conflict-with-mobile-safaris-menu-bar/)

## The Dead Zone learning

After playing around with this buttons I found out there is a zone in the viewport - around 15px height - reserved for triggering the toolbar in "fullscreen mode". Learning is simple:

> Don't place elements ```position:fixed;``` lower than ```bottom:15px``` and you will live forever!
