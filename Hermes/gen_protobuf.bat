set out_cs=Protoc\Messages

set protobuf="..\packages\Google.Protobuf.Tools.3.2.0\tools\windows_x86\protoc.exe"

%protobuf% --csharp_out=%out_cs% message.proto


pause