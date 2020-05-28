export default {
    trimmer: (payload) => {
        const data = {};
        if (payload) {
            Object.keys(payload).forEach((key) => {
                const value = payload[key];
     Object.assign(data, { [key]: typeof value === 'string' ? value.trim() : value });

            });
            return data;
        }
    }
}