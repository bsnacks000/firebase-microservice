
const isArray = function (a) {
    return Array.isArray(a);
  };

const isObject = function (o) {
    return o === Object(o) && !isArray(o) && typeof o !== 'function';
  };

const toCamel = (s) => {
    return s.replace(/([-_][a-z])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
};

const keysToCamel = function (o) {
    if (isObject(o)) {
      const n = {};
  
      Object.keys(o)
        .forEach((k) => {
          n[toCamel(k)] = keysToCamel(o[k]);
        });
  
      return n;
    } else if (isArray(o)) {
      return o.map((i) => {
        return keysToCamel(i);
      });
    }
  
    return o;
};

const toSnake = (c) => c.replace(/[A-Z]/g, 
				(letter, index) => { return index === 0 ? letter.toLowerCase() : '_'+ letter.toLowerCase();});


const keysToSnake = function (o) {
	if (isObject(o)) {
		const n = {};
	
		Object.keys(o)
		.forEach((k) => {
			n[toSnake(k)] = keysToSnake(o[k]);
		});
	
		return n;
	} else if (isArray(o)) {
		return o.map((i) => {
		return keysToSnake(i);
		});
	}
	
	return o;
};
		

export {keysToCamel, keysToSnake};