
export default async function RecommendedSingleProduct({params}) {
    const {id} = await params;
    console.log(id)
  return (
    <div>Product Id {id}</div>
  )
}
