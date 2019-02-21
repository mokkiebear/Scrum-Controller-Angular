let message: string;
message = 'abc';
let endsWithC = (<string>message).endsWith('c');
let anotherWay = (message as string).endsWith('c');
let test: string;