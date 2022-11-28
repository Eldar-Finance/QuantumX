import { Address, BytesValue } from "@elrondnetwork/erdjs/out";
import { sha256 } from "js-sha256";
import toHex from "to-hex";
export default function handler(req, res) {
  if (req.method === "POST") {
    const { token, amount, address } = req.body;
    const key = "3ld4rianst0TheM0ON";

    const keyHex = BytesValue.fromUTF8(key).valueOf().toString("hex");
    const tokenHex = BytesValue.fromUTF8(token).valueOf().toString("hex");
    const amountHex = toHex(amount, { evenLength: true });
    const addressHex = new Address(address).hex();

    const totalHexString = keyHex + tokenHex + amountHex + addressHex;
    const buffer = BytesValue.fromHex(totalHexString).valueOf();

    const hash = sha256(buffer);
    const data = {
      hash: hash,
    };
    res.status(200).json(data);
  } else {
    res.status(405).end();
  }
}
