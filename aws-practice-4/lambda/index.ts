type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    msg: string;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  // event is used to know which field we have to select

  if (event.info.fieldName === "hello") return "Hello World";
  else if (event.info.fieldName === "myCustomMessage")
    return `This is my custom message ==> ${event.arguments.msg}`;
  else return "No Data";
};

// exports.handler = async () => {
//   return "Hello World";
// };
