import mssql from 'mssql';

const config = {
  user: 'SA',
  password: 'Today@123!',
  server: 'localhost', // Or the IP address
  port: 1433,
  database: 'oyd-dev',
  options: {
    encrypt: true, // Recommended
    trustServerCertificate: true // Required if not using a trusted certificate
  }
};

const connectToSqlServer = async () => {
  let pool: mssql.ConnectionPool | undefined;
  try {
    pool = await mssql.connect(config);
    console.log('Connected to SQL Server!');
    // Perform database operations
  } catch (err: any) {
    console.error('Connection failed:', err.message);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

connectToSqlServer();
export const poolPromise = mssql.connect(config);