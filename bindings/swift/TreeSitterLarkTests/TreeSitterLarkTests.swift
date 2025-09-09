import XCTest
import SwiftTreeSitter
import TreeSitterLark

final class TreeSitterLarkTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_lark())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Lark grammar")
    }
}
