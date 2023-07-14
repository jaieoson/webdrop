import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession();

  const { userId, totalPrice, qtdTotal, itemsCart } = req.body;

  // Selecionar o carrinho atual do usuário
  const cart = await prisma.cart.findFirst({
    where: {
      userId: userId,
      status: 'STARTED',
    },
    include: {
      itemsCart: true,
    },
  });
  
  // Se o carrinho atual não for encontrado, crie um novo
  if (!cart) {
    const newCart = await prisma.cart.create({
      data: {
        userId,
        totalPrice,
        qtdTotal,
        status: 'STARTED',
        itemsCart: {
          createMany: {
            data: itemsCart.map((productId) => ({ productId })),
          },
        },
      },
    });
    return newCart;
  }
  
  // Gerar uma lista de IDs de produtos atualmente no carrinho
  const currentItems = cart.itemsCart.map((item) => item.productId);
  
  // Gerar uma lista de IDs de produtos no novo carrinho
  const newItems = itemsCart;
  
  // Excluir itens que não estão mais no carrinho
  for (const item of cart.itemsCart) {
    if (!newItems.includes(item.productId)) {
      await prisma.itemsCart.delete({
        where: {
          id: item.id,
        },
      });
    }
  }
  
  // Adicionar novos itens ao carrinho
  for (const productId of newItems) {
    if (!currentItems.includes(productId)) {
      await prisma.itemsCart.create({
        data: {
            productId: productId,
            cartId: cart.id,
        
        },
      });
    }
  }
  
  // Atualizar o carrinho com o novo preço total e quantidade total
  const updatedCart = await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      totalPrice,
      qtdTotal,
    },
    include: {
      itemsCart: true,
    },
  });
  
  return updatedCart;
  
    
    
    
  
}
