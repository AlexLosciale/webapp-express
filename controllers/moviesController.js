import connection from "../data/db.js";

//index

function index(req, res) {
    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Errore lato server INDEX function',
            });
        }

        const movis = results.map((movis) => { 
            return {
              ...movis,
              image: req.imagePath + movis.image,
            };
        });
        res.json(movis);
    });
};

//show
function show(req, res) {
    const { id } = req.params;

    const movieSql = 'SELECT * FROM movies WHERE id = ?';
    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    connection.query(movieSql, [id], (err, results) => {
        if (err) {
            console.error("Errore nella query del film:", err);
            return res.status(500).json({ error: 'Errore lato server nella SHOW function' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const movie = results[0];

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) {
                console.error("Errore nella query delle recensioni:", err);
                return res.status(500).json({ error: 'Errore lato server nella SHOW function' });
            }

            movie.reviews = reviewsResults;

            res.json({
                ...movie,
                image: req.imagePath ? req.imagePath + movie.image : movie.image,
            });
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

