
const config: {
  [key: string]: {
    name: string;
    cateList: string[];
    goodsList: string[];
  };
} = {
  'mall-001': {
    name: "Mall-001",
    cateList: ['mall-001-food', 'mall-001-clothes'],
    goodsList: ['mall-001-phone', 'mall-001-macBook']
  },
  'mall-002': {
    name: "Mall-002",
    cateList: ['mall-002-electronics', 'mall-002-gift'],
    goodsList: ['mall-002-phone', 'mall-002-macBook']
  },
};


/**
 * get the config info of mall 
 * @returns 
 */
export async function fetchMallConfig(mallNo?: string) {
  console.log('start a new request');

  console.log('mallNo: ', mallNo);


  // Simulating API requests
  return new Promise<{ name: string, cateList: string[], goodsList: string[] }>((resolve) => {
    setTimeout(() => {

      if (mallNo && config[mallNo]) {
        resolve(config[mallNo]);
      } else {
        // Return a default or empty config if mallNo is undefined or not found
        resolve({ name: '', cateList: [], goodsList: [] });
      }
    }, 2000);
  });
}