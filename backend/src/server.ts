import app from "./app";
import sequelize from "./config/database";

const PORT = 3000;

sequelize.sync({ force: false }).then(() => {
  console.log("Base de datos conectada");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
