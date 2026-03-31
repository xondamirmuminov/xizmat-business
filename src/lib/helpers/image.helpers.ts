export class ReactNativeFile {
  uri: string;
  type: string;
  name: string;

  constructor({
    uri,
    name,
    type,
  }: {
    uri: string;
    name: string;
    type: string;
  }) {
    this.uri = uri;
    this.name = name;
    this.type = type;
  }
}
