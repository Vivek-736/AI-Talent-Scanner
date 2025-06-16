import React from "react";

const BillingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Billing Dashboard
          </h1>
          <div className="text-sm text-gray-500">
            <p>Invoice #INV-2025-001</p>
            <p>Date: June 16, 2025</p>
          </div>
        </div>

        {/* Billing Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Billed To:
            </h2>
            <p className="text-gray-600">John Doe</p>
            <p className="text-gray-600">1234 Elm Street, Suite 567</p>
            <p className="text-gray-600">Springfield, IL 62701</p>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">From:</h2>
            <p className="text-gray-600">Acme Corporation</p>
            <p className="text-gray-600">5678 Oak Avenue</p>
            <p className="text-gray-600">Metropolis, NY 10001</p>
            <p className="text-gray-600">billing@acmecorp.com</p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Quantity</th>
                <th className="p-4 font-semibold">Unit Price</th>
                <th className="p-4 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4">Premium Subscription</td>
                <td className="p-4">1</td>
                <td className="p-4">$99.99</td>
                <td className="p-4">$99.99</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4">Additional User License</td>
                <td className="p-4">2</td>
                <td className="p-4">$49.99</td>
                <td className="p-4">$99.98</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4">Support Package</td>
                <td className="p-4">1</td>
                <td className="p-4">$29.99</td>
                <td className="p-4">$29.99</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold text-gray-700">
                <td className="p-4 col-span-3">
                  Total
                </td>
                <td className="p-4">$229.96</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Payment Status */}
        <div className="mt-8 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Payment Status
            </h2>
            <p className="text-green-600 font-medium">Paid</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Download Invoice
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Thank you for your business!</p>
          <p>Contact us at support@acmecorp.com for any inquiries.</p>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
