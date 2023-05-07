export function useGet(url, setData) {
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      async function fetchData() {
        let hasError = false;
        setLoading(true);
  
        let config = {};
  
        const response = await axios.get(url, config).catch((err) => {
          hasError = isRealError(err);
        });
  
        if (!hasError) {
          setData(response.data);
        }
  
        setLoading(false);
      }
      fetchData();
    }, [url, version]);
  
    return { isLoading, reFetch };
  }