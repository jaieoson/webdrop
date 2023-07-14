import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, title, bio } = req.body;

  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
        title: title,
        bio: bio,
    },
  })

  
}
