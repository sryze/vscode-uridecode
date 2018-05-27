# URI Encode/Decode

This is a simple extension that URI-encodes or decodes a piece of text as a full URI as as 
URI component.

## Features

* Select a URL and open command palette -> `Encode as URI` or `Decode as URI` to encode/decode as
  a full URL. This ensures that only the necessary parts are encode, i.e. URL parameters.

* Select a part of a URL and open command palette -> `Encode as URI Component` or 
  `Decode as URI Component` to encode/decode as a URL parameter. 
  
  Usually you only want to use this if you select the value of some parameter after the `=` sign 
  and you want to encode/decode only that piece.

## Release Notes

### 0.2

Added `Encode as URI` and `Decode as URI` commands.

### 0.1

Fixed a typo in README.

### 0.0.1

Initial release.
