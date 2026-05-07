export const Lista = ({ consumos, onDelete }) => {
    return (
        <div>
            <h2>Lista de Consumos</h2>

            {consumos.length === 0 ? (
                <p>Nenhum item encontrado</p>
            ) : (
                consumos.map((item) => (
                    <div key={item.id}>
                        <strong>{item.nome}</strong>
                        {" - R$ "}
                        {item.valor}
                        {" - "}
                        {item.categoria}
                        {" - "}
                        {item.tipo}

                        <button onClick={() => onDelete(item.id)}>🗑️</button>
                    </div>
                ))
            )}
        </div>
    );
};
