const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

// ******************************  Connect to the mysql database ******************************* //
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "nclespaul",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
});

// Have the user choose a path from a pre-defined menu.
var managerMenu  = function() {
        inquirer.prompt([{
                type: 'list',                                                       //  Defines the type of prompt
                name: 'menu',                                                       //  User answer stored here.
                message: 'Please choose an option from the following list.',        //  Prompt for user.  
                choices: ['View Product for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }]).then(function(choice) {
        //  Call the appropriate function based on the user choice.
            if (choice.menu === 'View Product for Sale') {
                productForSale();
            } else if (choice.menu === 'View Low Inventory') {
                lowInventory();
            } else if (choice.menu === 'Add to Inventory') {
                addInventory();            
            } else if (choice.menu === 'Add New Product') {
                addProduct();
            } else {
                console.log('Exiting program...');
                process.exit();
            }
        });
    }

// ***************************************** Functions *************************************** //

// This routine displays all of the available inventory and associated properties / values.
var productForSale = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        var table = new Table({
                head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity Available']
        });
        // Pushes the inventory into a table and displays the result. 
            console.log("  \n\nCurrent inventory.");
            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            console.log(table.toString());
            console.log("\n");
            managerMenu();
    });
}  // End of productForSale()

// This routine displays all inventory items with available stock < 5.
var lowInventory = function() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (res.length == 0) {
            console.log("  All inventory currently at acceptable levels (Quantity of at least five)\r\n");  // All inventory > 5 count.
        } else {
            var table = new Table({
                    head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity Available']
            });
            // Pushes the inventory into a table and displays the result.             
                console.log("  Current Inventory with less than 5 items available.");
                for (var i = 0; i < res.length; i++) {
                    table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
                }
                console.log(table.toString());
                console.log("\n");
            }
        managerMenu();
    });
}  // End of lowInventory()

// Allows the user to increase inventory for any of the items. 
var addInventory = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        var table = new Table({
                style: {"padding-left": 0, "padding-right": 0},
                head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity Available']
        });
        // Pushes the inventory into a table and displays the result. 
            console.log("\n\nCurrent Inventory");
            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            console.log(table.toString());
            console.log("\n");
        // Prompt the user for which Item ID to increase stock, and by how much.
            var orderForm = function () {
                inquirer.prompt([{
                    name: "addInv",
                    type: "input",
                    message: "  ADD INVENTORY:  Please enter the Item ID number to increase stock:  ",
                    validate: function(value) {
                        if (value < 1 || value > res.length + 1 || isNaN(value) == true) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }, {
                    name: "quantity",
                    type: "input",
                    message: "  Please enter how many to add to stock:  ",
                    validate: function(value) {
                        if (isNaN(value) == true || value < 1) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }]).then(function(answer) {
                    var addId = answer.addInv - 1;
                    var increase_product_id = res[addId];
                    var increase_product_name = increase_product_id.product_name;
                    var increase_quantity = answer.quantity;
                    var new_stock_quantity = +increase_quantity + +increase_product_id.stock_quantity;
                    console.log("    Adding " + increase_quantity + " " + increase_product_name + "(s) increases available inventory to " + new_stock_quantity);
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: new_stock_quantity 
                    }, {
                        item_id: res[addId].item_id
                    }]) 
                    process.exit();
                })
            }
        orderForm();
    });
}  // End of addInventory() 

//  Allows the user to add a product to inventory.
var addProduct = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        var table = new Table({
                head: ['Item ID', 'Product Name', 'Department', 'Price (each)', 'Quantity Available']
        });
        // Push the response into the table array. 
            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
    inquirer.prompt([{
                    name: "newProduct",
                    type: "input",
                    message: "ADD PRODUCT:  Please enter the Product Name for the new item:  ",
                    validate: function(value) {
                        if (isNaN(value) == true) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }, {
                    name: "newDept",
                    type: "input",
                    message: "Please enter the Department for this new item:  ",
                    validate: function(value) {
                        if (isNaN(value) == true) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }, {
                    name: "newPrice",
                    type: "input",
                    message: "Please enter the Price for this new item:  ",
                    validate: function(value) {
                        if (isNaN(value) == true) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }, {
                    name: "newQuantity",
                    type: "input",
                    message: "Please enter how much stock is available for this new item:  ",
                    validate: function(value) {
                        if (isNaN(value) == true) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                // Update database with info for the new product.
                }]).then(function(answer) {
                    connection.query("INSERT INTO products SET ?", {
                        item_Id: res.length + 1,
                        product_name: answer.newProduct,
                        department_name: answer.newDept,
                        price: answer.newPrice,
                        stock_quantity: answer.newQuantity 
                    }) 
                    process.exit();
                })
            })
}  

managerMenu();