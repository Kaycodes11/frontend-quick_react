import { UserSchemaWithGeo } from '../models/User';
import { z } from 'zod';

const UserResults = z.array(UserSchemaWithGeo); // it does -> UserSchemaWithGeo[]

type UserArray = z.infer<typeof UserResults>;

export default async function fetchUsers(): Promise<UserArray | undefined> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!res.ok) return undefined;

    const usersJson: UserArray = await res.json();

    const parsedData = UserResults.parse(usersJson); // validating and parsing response i.e. usersJson

    console.group(parsedData);

    return parsedData;
  } catch (err) {
    if (err instanceof Error) console.log(err.stack);
  }
}
