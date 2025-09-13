# tree-sitter-lark

[Tree-sitter](https://github.com/tree-sitter/tree-sitter) parser for
[Lark](https://github.com/lark-parser/lark) grammars.

The [tree-sitter grammar](https://github.com/chanicpanic/tree-sitter-lark/blob/main/grammar.js)
is based on [`load_grammar.py`](https://github.com/lark-parser/lark/blob/master/lark/load_grammar.py)
and [`lark.lark`](https://github.com/lark-parser/lark/blob/master/lark/grammars/lark.lark)

## Installation

### Neovim with [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)

Add the following to your Neovim config:

```lua
vim.filetype.add({
  extension = {
    lark = "lark",
  },
})

local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.lark = {
  install_info = {
    url = "https://github.com/chanicpanic/tree-sitter-lark",
    files = { "src/parser.c" },
    branch = "main",
  },
}
```

Reopen Neovim and run:

```
:TSInstall lark
```

#### Syntax Highlighting

##### Query File Installation

Syntax highlighting depends on the presence of query files.

###### Plugin Manager

Install this repository (https://github.com/chanicpanic/tree-sitter-lark) using
your plugin manager.

###### Manual Installation

Copy all the files from `queries/lark/` in this repository to
`~/.config/nvim/queries/lark/`.

##### Regex Highlighting

To highlight regex literals in Lark grammars, be sure the regex parser is installed:

```
:TSInstall regex
```
