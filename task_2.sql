WITH top_txs AS (
    SELECT * 
    FROM test_txs 
    ORDER BY block_height DESC 
    LIMIT $1
)
SELECT t.* 
FROM test_blocks b
JOIN top_txs t ON b.height = t.block_height
ORDER BY t.block_height DESC;
