(COMMENT) @comment

[
 (OP)
 (VBAR)
 "->"
 "~"
 ".."
] @operator

[
  "%ignore"
  "%import"
  "%override"
  "%extend"
  "%declare"
] @keyword

[
 ":"
 ","
 "."
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

(STRING) @string
(REGEXP) @string.regexp
(NUMBER) @number

(RULE_MODIFIERS) @attribute

(rule
  (RULE) @function)
(terminal
  (TERMINAL) @function)

(value
  (RULE) @variable)
(value
  (TERMINAL) @variable)

(template_usage
  (RULE) @function)
(declare
  (name) @function)
(rule_params
  (RULE) @variable.parameter)

(alias
  "->"
  (RULE) @label)

(import
  "->"
  (name) @function)

(import_path
  .
  (name) @module.builtin)
(import_path
  "."
  (name) @module)
(import_path
  "."
  (name) @function
  .
)
(multi_import
  (import_path
    (".")
    (name) @module))

(name_list
  (name) @function)
