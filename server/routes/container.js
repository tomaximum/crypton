var app = process.app;
var db = app.datastore;
var middleware = require('../lib/middleware');
var verifySession = middleware.verifySession;

app.get('/container/:containerNameHmac', verifySession, function (req, res) {
  var containerName = req.params.containerNameHmac;
  var accountId = req.session.accountId;

  // TODO verify user has access to container
  /*
  db.getContainer(containerName, function (err, container) {
    db.getAccount(accountId, function () {
    });
  });
  */

  db.getContainerRecords(containerName, function (err, records) {
    if (err) {
      res.send({
        success: false,
        error: err
      });
      return;
    }

    res.send({
      success: true,
      records: records
    });
  });
});

app.post('/container/:containerNameHmac', verifySession, function (req, res) {
  res.send('');
});

app.get('/container/:containerNameHmac/:recordVersionIdentifier', verifySession, function (req, res) {
  var containerName = req.params.containerNameHmac;
  var versionIdentifier = req.params.recordVersionIdentifier;

  db.getContainerRecord(containerName, versionIdentifier, function (err, records) {
    if (err) {
      res.send({
        success: false,
        error: err
      });
      return;
    }

    res.send({
      success: true,
      records: records
    });
  });
});
