import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function San({props}) {
    console.log(props)
    const tags = props.tags
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{props.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {props.description}
                </CardContent>
                <CardFooter>
                   {tags && tags.map(
                        (info,index)=>{
                            return (
                                <Badge variant="outline">{info}</Badge>
                            )
                        }
                    )}
                </CardFooter>
            </Card>

        </>
    )
}

