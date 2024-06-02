import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { formatAmount, formatDateTime, getTransactionStatus } from '@/lib/utils'

const TransactionsTable = ({transactions} : TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className='bg-[#f9fafb]'>
        <TableRow>
          <TableHead className='px-2'>Transaction</TableHead>
          <TableHead className='px-2'>Amount</TableHead>
          <TableHead className='px-2'>Status</TableHead>
          <TableHead className='px-2'>Date</TableHead>
          <TableHead className='px-2 max-md:hidden'>Channel</TableHead>
          <TableHead className='px-2 max-md:hidden'>Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction)=>{
          const status = getTransactionStatus(new Date(t.date));
          const amount = formatAmount(t.amount);
          const isDebit = t.type === 'debit';
          const isCredit = t.type === 'credit';
          console.log(t.name)
          return(
            <TableRow key={t.id} className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !over:bg-none !border-b-DEFAULT`}>
              <TableCell className='max-w-[250px] pl-2 pr-10'>
                <div>
                  <h1>
                    {t.name}
                  </h1>
                </div>
              </TableCell>
              <TableCell>
                {isDebit? `-${amount}` : isCredit? amount: amount }
              </TableCell>
              <TableCell>
                {status}
              </TableCell>
              <TableCell>
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>
              <TableCell className='max-md:hidden'>
                {t.paymentChannel}
              </TableCell>
              <TableCell className='max-md:hidden'>
                {t.category}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TransactionsTable
