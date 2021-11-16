import express from 'express';
import {ApigeeService, ApiManagementInterface, ApiProducts, Developers, Developer, Apps} from 'apigee-x-module'

const app = express();
const apigeeService: ApiManagementInterface = new ApigeeService();

app.use(express.json());
app.use(express.static('public'));

app.get('/apim/apiproducts', (req, res) => {
  apigeeService.getApiProducts().then((result: ApiProducts) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

app.get('/apim/developers', (req, res) => {
  apigeeService.getDevelopers().then((result: Developers) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json')
      res.send(result);
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

app.get('/apim/developers/:email', (req, res) => {
  apigeeService.getDeveloper(req.params.email).then((result: Developer) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json')

      if (result.error) {
        res.status(parseInt(result.error.code)).send({
          error: {
            code: parseInt(result.error.code),
            message: result.error.status,
            status: result.error.status
          }
        });
      }
      else
        res.send(result);
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

app.get('/apim/developers/:email/apps', (req, res) => {
  apigeeService.getApps(req.params.email).then((result: Apps) => {
    if (result) {
      res.setHeader('Content-Type', 'application/json')

      if (result.error) {
        res.status(parseInt(result.error.code)).send({
          error: {
            code: parseInt(result.error.code),
            message: result.error.status,
            status: result.error.status
          }
        });
      }
      else
        res.send(result);
    }
  }).catch((error) => {
    console.error(error);

    res.status(500).send({
      error: {
        code: 500,
        message: "Server error",
        status: "SERVER_ERROR"
      }
    });
  });
});

app.listen(8080, () => {
  console.log(`Server listening at port: 8080`);
});