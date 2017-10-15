var myDB;
//Open Database Connection
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
	//cordova-plugin-sqlite.SQLitePlugin
	var myDB = window.SQLitePlugin.openDatabase({
		name: "mPharmarcy.db", 
		location: 'default'
	});

	myDB.transaction(function(transaction) {
		transaction.executeSql('CREATE TABLE IF NOT EXISTS drug_tb (id integer primary key, drug_id integer, drug_name text, intro text, desc text, info text, before_use text, how_to_use text, miss_a_dose text, over_dose text, avoid text, side_effect text, adol_dosage text, adult_dosage text)', [],
		function(tx, result) {
			alert("Table created successfully");
		},
		function(error) {
			alert("Error occurred while creating the table.");
		});
	});
}
