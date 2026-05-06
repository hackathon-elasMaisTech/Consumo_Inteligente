// ✅ URL correta do MockAPI (com /api/v1/)
const BASE_URL = "https://69fa756588a7af0ecca763f0.mockapi.io/consumos";

// 🔍 BUSCAR todos os consumos
export const getConsumos = async () => {
  try {
    const res = await fetch(BASE_URL);

    // verifica se a resposta foi bem sucedida
    if (!res.ok) {
      throw new Error("Erro ao buscar consumos");
    }

    // retorna lista (array)
    return await res.json();
  } catch (error) {
    console.error("Erro na API (GET):", error);
    return []; // evita quebrar o app
  }
};

// ➕ CRIAR novo consumo
export const createConsumo = async (data) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error("Erro ao criar consumo");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro na API (POST):", error);
    return null;
  }
};

// 🗑️ DELETAR consumo (extra - já deixa pronto)
export const deleteConsumo = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("Erro ao deletar consumo");
    }

    return true;
  } catch (error) {
    console.error("Erro na API (DELETE):", error);
    return false;
  }
};

// ✏️ ATUALIZAR consumo (extra - nível avançado)
export const updateConsumo = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error("Erro ao atualizar consumo");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro na API (PUT):", error);
    return null;
  }
};