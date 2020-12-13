module.exports = {
    mode : 'Developement',
    host : 'http://localhost:',
    secureData : process.env.sensitiveData ? process.env.sensitiveData : '',
    mysqlDBName : process.env.MYSQL_DB_NAME ? process.env.MYSQL_DB_NAME : 'name',
    mysqlDBHost : process.env.MYSQL_DB_HOST ? process.env.MYSQL_DB_HOST : 'localhost',
    mysqlDBPort : process.env.MYSQL_DB_PORT ? process.env.MYSQL_DB_PORT : '3306',
    mysqlDBUser : process.env.MYSQL_DB_USER ? process.env.MYSQL_DB_USER : 'root',
    mysqlDBPassword : process.env.MYSQL_DB_PASSWORD ? process.env.MYSQL_DB_PASSWORD : '',
    mysqlDialect : process.env.MYSQL_DB_DIALECT ? process.env.MYSQL_DB_DIALECT : 'mysql',
    jwt_sec : 'fragmaData@2020jwt!!!',
    jwt_exp : '48h',
    crypt_key : 'fragmaData@2020!!!'

}