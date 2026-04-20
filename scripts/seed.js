const { exec } = require('child_process');

console.log('Seeding database...');

exec('curl -X POST http://localhost:3000/api/seed', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log('Database seeded successfully!');
  console.log(stdout);
});