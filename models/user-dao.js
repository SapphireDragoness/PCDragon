'use strict';

const db = require('../db.js');
const bcrypt = require('bcrypt');

exports.registerUser = function(email, username, firstName, lastName, password) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO user(email, username, firstName, lastName, password) VALUES (?, ?, ?, ?, ?)';
    const hashedPassword = bcrypt.hashSync(password, 10);
    const values = [email, username, firstName, lastName, password];
      db.run(sql, values, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
}

exports.getUserById = function(id) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE id = ?';
      db.get(sql, [id], (err, row) => {
          if (err) 
              reject(err);
          else if (row === undefined)
              resolve({error: 'User not found.'});
          else {
              const user = {id: row.id, username: row.email}
              resolve(user);
          }
      });
  });
};

exports.getUser = function(email, password) {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE email = ?';
      db.get(sql, [email], (err, row) => {
          if (err) 
              reject(err);
          else if (row === undefined)
              resolve({error: 'User not found.'});
          else {
            const user = {id: row.id, username: row.email};
            let check = false;
            
            if(bcrypt.compareSync(password, row.password))
              check = true;

            resolve({user, check});
          }
      });
  });
};