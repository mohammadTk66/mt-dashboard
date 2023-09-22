const ObjectConverter = () => {
  const temp = {
    csv: [
      { id: "value1", extractor: "heve33" },
      { id: "value2", extractor: "asdfasdf" },
      { id: "value3", extractor: "heveasdfasdf33" },
    ],
    csv_group: [
      { id: "value4", extractor: "heve33" },
      { id: "value5", extractor: "adfa" },
      { id: "value6", extractor: "hevasdfadfe33" },
    ],
    elastic: [
      { id: "value7", extractor: "heveasdf33" },
      { id: "value8", extractor: "asdfasdf" },
      { id: "value9", extractor: "asdf" },
    ],
    mongo: [
      { id: "value7", extractor: "asdf" },
      { id: "value8", extractor: "asdfasdfasdf" },
      { id: "value9", extractor: "asdfasdf" },
    ],
    mssql: [
      { id: "value7", extractor: "adfasdf" },
      { id: "value8", extractor: "ssdfsdf" },
      { id: "value9", extractor: "efsdfasfe" },
    ],
    mysql: [],
  };

  const updatedObject = Object.entries(temp).reduce((acc, [key, value]) => {
    const updatedValue = value.map((obj) => ({ ...obj, db: key })).flat();
    return [...acc, ...updatedValue];
  }, []);

  console.log(updatedObject);
  return (
    <>
      <ul>
        {updatedObject.map((item, index) => (
          <li key={index}>
            {item.key}
            {item.extractor}
            {item.id}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ObjectConverter;
