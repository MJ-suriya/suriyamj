const DB = {
  getData() {
    const data = localStorage.getItem("creditSystem");

    if (!data) {
      const defaultData = {
        balance: 0,
        overExpense: 0,
        transactions: []
      };

      localStorage.setItem("creditSystem", JSON.stringify(defaultData));
      return defaultData;
    }

    return JSON.parse(data);
  },

  saveData(data) {
    localStorage.setItem("creditSystem", JSON.stringify(data));
  }
};