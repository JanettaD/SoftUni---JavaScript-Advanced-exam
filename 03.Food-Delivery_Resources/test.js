import { expect } from "chai";
import { foodDelivery } from "./food delivery.js";
import { it } from "mocha";


describe('test suite', function () {

    describe("foodDelivery Functunality Tests", function() {
        describe("getCategory Tests", function() {
          it("should return the correct string for the Vegan category", function() {
            expect(foodDelivery.getCategory("Vegan")).to.equal("Dishes that contain no animal products.");
          });
      
          it("should return the correct string for the Vegetarian category", function() {
            expect(foodDelivery.getCategory("Vegetarian")).to.equal("Dishes that contain no meat or fish.");
          });
      
          it("should return the correct string for the Gluten-Free category", function() {
            expect(foodDelivery.getCategory("Gluten-Free")).to.equal("Dishes that contain no gluten.");
          });
      
          it("should return the correct string for the All category", function() {
            expect(foodDelivery.getCategory("All")).to.equal("All available dishes.");
          });
      
          it("should throw an error if it is an invalid category", function() {
            expect(() => foodDelivery.getCategory("Meat")).to.throw("Invalid Category!");
          });
        });
      
        describe("addMenuItem Functunality Tests", function() {
          it("should add menu items correctly and return the correct string", function() {
            const menu = [{ name: "Salad", price: 4 }, { name: "Soup", price: 6 }];
            expect(foodDelivery.addMenuItem(menu, 6)).to.equal("There are 2 available menu items matching your criteria!");
          });
      
          it("should return correct string when multiple items are a match", function() {
            const menu = [{ name: "Salad", price: 4 }, { name: "Soup", price: 5 }];
            expect(foodDelivery.addMenuItem(menu, 5)).to.equal("There are 2 available menu items matching your criteria!");
          });

          it("should return correct string when only some items are a match", function() {
            const menu = [{ name: "Salad", price: 4 }, { name: "Soup", price: 5 }, { name: "Salad", price: 10 }];
            expect(foodDelivery.addMenuItem(menu, 5)).to.equal("There are 2 available menu items matching your criteria!");
          });
      
          it("should throw an error for invalid menu item parameter", function() {
            expect(() => foodDelivery.addMenuItem("invalid", 10)).to.throw("Invalid Information!");
          });
      
          it("should throw an error for invalid max price parameter", function() {
            expect(() => foodDelivery.addMenuItem([], "invalid")).to.throw("Invalid Information!");
          });
      
          it("should throw an error for menu item array with fewer than 1 item", function() {
            expect(() => foodDelivery.addMenuItem([], 10)).to.throw("Invalid Information!");
          });
      
          it("should throw an error when max price is less than 5", function() {
            expect(() => foodDelivery.addMenuItem([{ name: "Salad", price: 4 }], 4)).to.throw("Invalid Information!");
          });
        });
      
        describe("calculateOrderCost Functunality Tests", function() {
          it("should calculate the cost correctly without discount", function() {
            expect(foodDelivery.calculateOrderCost(["standard"], ["sauce"], false)).to.equal("You spend $4.00 for shipping and addons!");
          });
      
          it("should calculate the cost correctly with 15% discount", function() {
            expect(foodDelivery.calculateOrderCost(["express"], ["beverage"], true)).to.equal("You spend $7.22 for shipping and addons with a 15% discount!");
          });
      
          it("should calculate the cost correctly with multiple addons options", function() {
            expect(foodDelivery.calculateOrderCost(["express"], ["sauce", "beverage"], false)).to.equal("You spend $9.50 for shipping and addons!");
          });
      
          it("should throw an error for invalid shipping parameter", function() {
            expect(() => foodDelivery.calculateOrderCost("", ["sauce"], false)).to.throw("Invalid Information!");
          });
      
          it("should throw an error for invalid addons parameter", function() {
            expect(() => foodDelivery.calculateOrderCost(["standard"], "", false)).to.throw("Invalid Information!");
          });
      
          it("should throw an error for invalid discount parameter", function() {
            expect(() => foodDelivery.calculateOrderCost(["standard"], ["sauce"], "")).to.throw("Invalid Information!");
          });
        });
      });

});