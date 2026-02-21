import React, { Fragment } from "react"

import type { Page } from "@/payload-types"

import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component"
import { CallToActionBlock } from "@/blocks/CallToAction/Component"
import { ContentBlock } from "@/blocks/Content/Component"
import { FormBlock } from "@/blocks/Form/Component"
import { MediaBlock } from "@/blocks/MediaBlock/Component"

// New Marketing Agency Block Components
import { ServicesGridBlockComponent } from "@/blocks/ServicesGrid/Component"
import { StatsBlockComponent } from "@/blocks/StatsBlock/Component"
import { TextWithImageBlockComponent } from "@/blocks/TextWithImage/Component"
import { TestimonialsBlock } from "@/blocks/TestimonialsBlock/Component"
import { FAQBlockComponent } from "@/blocks/FAQBlock/Component"
import { CaseStudiesShowcaseComponent } from "@/blocks/CaseStudiesShowcase/Component"

// Block component mapping
const blockComponents: Record<string, React.FC<any>> = {
  // Core blocks
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  // Marketing agency blocks
  srvgrd: ServicesGridBlockComponent,
  "stats-block": StatsBlockComponent,
  "text-with-image": TextWithImageBlockComponent,
  "testimonials-block": TestimonialsBlock,
  "faq-block": FAQBlockComponent,
  casest: CaseStudiesShowcaseComponent,
  "hero-block": () => null,
  "cta-section": () => null,
  "team-grid": () => null,
  "clients-logo-grid": () => null,
  "blog-preview": () => null,
}

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={block.id || `block-${index}`}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
