import React from 'react'
import { router } from 'expo-router'
import { ChevronRight } from 'lucide-react-native'
import { ActivityIndicator } from 'react-native'
import { ListItem, ScrollView, Text, View, YGroup } from 'tamagui'

import { formatDate } from '@/lib/utils'
import { useMyItems } from '@/hooks/use-myitems'

const MyItems = () => {
  const { data, isLoading } = useMyItems('0')

  if (isLoading) {
    return (
      <View flex={1} pt={16}>
        <ActivityIndicator />
      </View>
    )
  }

  if (!data) return <Text>no data...</Text>

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View m="$2" gap="$2">
        <YGroup mb="$2">
          {data.items.map((item) => (
            <YGroup.Item key={item.id}>
              <ListItem
                onPress={() => {
                  router.navigate({
                    pathname: '/my-items/[id]',
                    params: {
                      category: item.category,
                      imgUrl: item.imgUrl,
                      itemName: item.name,
                      returnDate: item.returnDate,
                      borrowedDate: item.borrowedDate,
                    },
                  })
                }}
                pressTheme
                title={item.name}
                iconAfter={<ChevronRight />}
                subTitle={
                  <>
                    {item.isBorrowed ? (
                      <>
                        <Text fontSize={12} color="$color05">
                          Unavailable
                        </Text>
                        {item.returnDate != null && (
                          <Text fontSize={12} color="$color05">
                            Returning on {formatDate(new Date(item.returnDate))}
                          </Text>
                        )}
                      </>
                    ) : (
                      <Text fontSize={12} color="$color05">
                        Available
                      </Text>
                    )}
                  </>
                }
              />
            </YGroup.Item>
          ))}
        </YGroup>
      </View>
    </ScrollView>
  )
}

export default MyItems
