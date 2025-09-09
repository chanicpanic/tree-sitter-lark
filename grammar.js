/**
 * @file Lark grammar for tree-sitter
 * @author chanicpanic
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const NL_REGEX = /(\r?\n)+\s*/;

module.exports = grammar({
  name: "lark",

  rules: {
    source_file: $ => seq(
      repeat(
        seq(
          optional($._item),
          $._NL,
        ),
      ),
      optional($._item),
    ),

    _item: $ => choice(
      $.rule,
      $.terminal,
      $._statement,
    ),

    rule: $ => seq(
      optional($.RULE_MODIFIERS),
      $.RULE,
      optional($.rule_params),
      optional($.priority),
      ":",
      optional($.expansions),
    ),

    terminal: $ => seq(
      $.TERMINAL,
      optional($.priority),
      ":",
      optional($.expansions),
    ),

    rule_params: $ => seq(
      "{",
      $.RULE,
      repeat(
        seq(
          ",",
          $.RULE,
        ),
      ),
      "}",
    ),

    priority: $ => seq(
      ".",
      $.NUMBER,
    ),

    expansions: $ => prec.left(
      1,
      seq(
        $.alias,
        repeat(
          seq(
            $._VBAR,
            $.alias,
          ),
        ),
      ),
    ),

    alias: $ => seq(
      repeat1($.expr),
      optional(
        seq(
          "->",
          $.RULE,
        ),
      ),
    ),

    expr: $ => seq(
      $._atom,
      optional(
        choice(
          $.OP,
          seq(
            "~",
            $.NUMBER,
            optional(
              seq(
                "..",
                $.NUMBER,
              )
            )
          )
        )
      )
    ),

    _atom: $ => choice(
      $.atom,
      $.maybe,
      $._value,
    ),

    atom: $ => seq(
      "(",
      $.expansions,
      ")",
    ),

    maybe: $ => seq(
      "[",
      $.expansions,
      "]",
    ),

    _value: $ => choice(
      $.literal_range,
      alias(
        $.name,
        $.value,
      ),
      $.literal,
      $.template_usage,
    ),

    literal_range: $ => seq(
      $.STRING,
      "..",
      $.STRING,
    ),

    literal: $ => choice(
      $.REGEXP,
      $.STRING,
    ),

    template_usage: $ => seq(
      $.RULE,
      "{",
      $._value,
      repeat(
        seq(
          ",",
          $._value,
        ),
      ),
      "}",
    ),

    name: $ => choice(
      $.RULE,
      $.TERMINAL,
    ),

    _statement: $ => choice(
      $.ignore,
      $.import,
      $.multi_import,
      $.override,
      $.extend,
      $.declare,
    ),

    ignore: $ => seq(
      "%ignore",
      $.expansions,
    ),

    import: $ => seq(
      "%import",
      $.import_path,
      optional(
        seq(
          "->",
          $.name,
        ),
      ),
    ),

    import_path: $ => seq(
      optional("."),
      $.name,
      repeat(
        seq(
          ".",
          $.name,
        ),
      ),
    ),

    multi_import: $ => seq(
      "%import",
      $.import_path,
      $.name_list,
    ),

    name_list: $ => seq(
      "(",
      $.name,
      repeat(
        seq(
          ",",
          $.name,
        ),
      ),
      ")",
    ),

    override: $ => seq(
      "%override",
      choice(
        $.rule,
        $.terminal,
      ),
    ),

    extend: $ => seq(
      "%extend",
      choice(
        $.rule,
        $.terminal,
      ),
    ),

    declare: $ => seq(
      "%declare",
      repeat1(
        $.name,
      ),
    ),

    RULE: $ => /_?[a-z][_a-z0-9]*/,

    RULE_MODIFIERS: $ => /(!|![?]?|[?]!?)/,

    OP: $ => /[+*?]/,

    TERMINAL: $ => /_?[A-Z][_A-Z0-9]*/,

    _NL: $ => NL_REGEX,

    _VBAR: $ => token(
      prec(
        1,
        seq(
          optional(NL_REGEX),
          "|",
        ),
      )
    ),

    NUMBER: $ => /[+-]?\d+/,

    STRING: $ => /"(\\"|\\\\|[^"\n])*?"i?/,

    REGEXP: $ => /\/(\\\/|\\\\|[^\/])*?\/[imslux]*/,

    _WHITESPACE: $ => /[ \t]+/,

    _COMMENT: $ => token(
      prec(
        1,
        new RustRegex(String.raw`\s*//[^\n]*|\s*#[^\n]*`),
      )
    ),

    _BACKSLASH: $ => /\\[ ]*\n/,
  },

  extras: $ => [
    $._WHITESPACE,
    $._COMMENT,
    $._BACKSLASH,
  ],
});
