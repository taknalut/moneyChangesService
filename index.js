const functions = require('@google-cloud/functions-framework');

functions.http('BillsCoinsChanges', (req, res) => {

    res.set('Access-Control-Allow-Origin', '*');

    const cost = req.query.cost || req.body.cost
    const receive = req.query.receive || req.body.receive
    const denominations = [10, 5, 1, 0.25, 0.1, 0.05, 0.01]
    const changes = receive - cost
    const output = {}
    let remaining = changes

    if (Math.sign(changes) >= 1) {
        denominations.forEach(denomination => {
            let count = Math.floor(remaining/denomination)
            output[denomination] = count

            if(remaining > 0) {
                remaining = remaining - (count*denomination)
            }
        })
        res.send(output);
    } else {
        res.send({"errorMessage": "Changes cannot be zero or negative number"});
    }

});
