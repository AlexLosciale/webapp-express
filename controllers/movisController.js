import connection from "../data/db";

//index

function index(req, res) {
    const sql = 'SELECT * FROM books';

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Errore lato server INDEX function',
            });
        }
        res.json(results);
    });
};

//show

function show(req, res) {
    const { id } = req.params;

    const movisSql = 'SELECT * FROM movis WHERE id= ?';

    const reviewsSql = 'SELECT * FROM reviews WHERE movis_id = ?';

    connection.query(movisSql, [id], (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'Errore lato server SHOW function',
            });

        if (results.length === 0)
            return res.status(404).json({
                error: 'movis not found',
            });

        const movis = results[0];

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err)
                return res.status(500).json({
                    error: 'Errore lato server SHOW function',
                });

            movis.reviews = reviewsResults;
            res.json(movis);
        });
    });
};

//destroy

function destroy(req, res) {
    const { id } = req.params;
  
    const sql = 'DELETE FROM movis WHERE id = ?';
  
    connection.query(sql, [id], (err) => {
      if (err)
        return res.status(500).json({
          error: 'Errore lato server DESTROY function',
        });
  
      res.sendStatus(204);
    });
};

export { index, show, destroy };

