// import { container } from 'tsyringe';
// import { Request, Response } from 'express';
// import CreateCheckoutService from '../services/CreateCheckoutService';
// export default class CheckoutsController {
//   public async store(req: Request, res: Response): Promise<Response> {
//     const { id } = req.params;
//     const { cardHash, purchaseAmount, address_id, product_id } = req.body;
//     const createCheckout = container.resolve(CreateCheckoutService);
//     await createCheckout.execute({
//       customer_id: id,
//       cardHash,
//       product_id,
//       purchaseAmount,
//       address_id,
//     });
//     return res.status(200).json({ message: 'Compra realizada com sucesso' });
//   }
// }
"use strict";