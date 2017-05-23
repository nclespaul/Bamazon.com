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
            // } else if (choice.menu === 'Add to Inventory') {
            //     addInventory(clozePrompt, 'cloze-log.txt');            
            // } else if (choice.menu === 'Add New Product') {
            //     newProduct('cloze-log.txt', 0);
            // } else if (choice.menu === 'Exit') {
            //     console.log('Exiting program...');
            }
        });
    }

// ***************************************** Functions *************************************** //

// This routine collects the previously created cards and pushes them into the card_array array.
var productForSale = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        var table = new Table({
                head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity Available']
        });
        // Pushes the inventory into a table and displays the result. 
            console.log("  Current inventory.");
            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            console.log(table.toString());
            managerMenu();
    });
}

var lowInventory = function() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (res.length == 0) {
            console.log("  All inventory currently at acceptable levels (Quantity greater than five)\r\n");
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
            }
        managerMenu();
    });
}


managerMenu();