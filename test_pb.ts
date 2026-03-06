const pb = { collection: () => ({ unsubscribe: () => {} }) };
console.log(typeof pb.collection().unsubscribe);
