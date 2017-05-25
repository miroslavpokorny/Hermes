set protobuf="..\packages\Google.Protobuf.Tools.3.2.0\tools\windows_x86\protoc.exe"

%protobuf% --js_out=library=HermesJS/proto/hermes/hermes-message,binary:. --proto_path="../Hermes/" ../Hermes/message.proto

pause