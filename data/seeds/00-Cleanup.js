const cleaner = require('knex-cleaner');
// will prevent foreign key errors when trying to truncate the tables that have FK pointing to them

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return cleaner.clean(knex);
};
