import { PaymentCollectionService } from "../../../../services"
import { FindParams } from "../../../../types/common"

/**
 * @oas [get] /payment-collections/{id}
 * operationId: "GetPaymentCollectionsPaymentCollection"
 * summary: "Get a PaymentCollection"
 * description: "Get a Payment Collection"
 * x-authenticated: false
 * parameters:
 *   - (path) id=* {string} The ID of the PaymentCollection.
 *   - (query) expand {string} Comma separated list of relations to include in the results.
 *   - (query) fields {string} Comma separated list of fields to include in the results.
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       medusa.paymentCollections.retrieve(paymentCollectionId)
 *         .then(({ payment_collection }) => {
 *           console.log(payment_collection.id)
 *         })
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl --location --request GET 'https://medusa-url.com/store/payment-collections/{id}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 * tags:
 *   - PaymentCollection
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             payment_collection:
 *               $ref: "#/components/schemas/PaymentCollection"
 *   "400":
 *     $ref: "#/components/responses/400_error"
 *   "401":
 *     $ref: "#/components/responses/unauthorized"
 *   "404":
 *     $ref: "#/components/responses/not_found_error"
 *   "409":
 *     $ref: "#/components/responses/invalid_state_error"
 *   "422":
 *     $ref: "#/components/responses/invalid_request_error"
 *   "500":
 *     $ref: "#/components/responses/500_error"
 */
export default async (req, res) => {
  const { id } = req.params
  const retrieveConfig = req.retrieveConfig

  const paymentCollectionService: PaymentCollectionService = req.scope.resolve(
    "paymentCollectionService"
  )

  const paymentCollection = await paymentCollectionService.retrieve(
    id,
    retrieveConfig
  )

  res.status(200).json({ payment_collection: paymentCollection })
}

export class GetPaymentCollectionsParams extends FindParams {}
