package tree_sitter_lark_test

import (
	"testing"

	tree_sitter "github.com/chanicpanic/go-tree-sitter"
	tree_sitter_lark "github.com/chanicpanic/tree-sitter-lark/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_lark.Language())
	if language == nil {
		t.Errorf("Error loading Lark grammar")
	}
}
