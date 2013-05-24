# Filterable

[![Build Status](https://travis-ci.org/lightswitch05/filterable.png?branch=master)](https://travis-ci.org/lightswitch05/filterable)

[Bootstrap](http://twitter.github.io/bootstrap/) and [X-editable](http://vitalets.github.io/x-editable/) themed [jQuery](http://jquery.com/) plugin that preforms per-column filtering for an HTML table.

## Demo
[http://lightswitch05.github.io/filterable](http://lightswitch05.github.io/filterable)

## Options
- `ignoreColumns`
  - Array of column indexes to not make filterable
  - Default: `[]`
- `onlyColumns`
  - Array of column indexes to make filterable, all other columns are left non-filterable.
  - This takes presidence over `ignoreColumns` when provided.
  - Default: `null` - all columns
- `prependWild`
  - Boolean if a wild card should be added to the start of all filter input
  - Default: `true`
- `appendWild`
  - Boolean if a wild card should be added to the end of all filter input
  - Default: `true`
- `ignoreCase`
  - Boolean if case should be ignored
  - Default: `true`